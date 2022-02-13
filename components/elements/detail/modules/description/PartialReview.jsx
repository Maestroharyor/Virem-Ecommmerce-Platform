import { useState, useEffect } from "react";
import Link from "next/link";
import {useRouter} from 'next/router';
import { connect, useDispatch } from "react-redux";
import { Rate, Avatar, notification } from "antd";
import axios from "axios";
import Rating from "../../../Rating";
import {
  WPRepository,
  WPDomain,
  ck_username,
  cs_password,
} from "../../../../../repositories/WP/WPRepository";
import { serializeQuery } from "../../../../../repositories/Repository";


const reviewSuccessful = type => {
    notification[type]({
        message: 'Review Added',
        // description: 'You have logged in successful!',
    });
};
const reviewFailed = (type, description) => {
    notification[type]({
        message: 'Unable to Add Review',
        description,
    });
};

const PartialReview = ({ id, auth, reviews, setReviews }) => {
  const router = useRouter()
  const ratingTotal = reviews
    .map((review) => review.rating)
    .reduce((a, b) => a + b, 0);
  const ratingTotalAverage = ratingTotal / reviews.length;
  console.log(ratingTotal / reviews.length);

  const desc = ["Bad", "Not Good", "Average", "Good", "Wonderful"];

  const [username, setUsername] = useState(auth.username);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(1);
  const [loading, setLoading] = useState(false);

  const refeshReviews = () => {

  }

  const handleReview = async (e) => {
    e.preventDefault();
    // console.log(username, auth.email, reviewComment, reviewRating)
    const data = JSON.stringify({
      product_id: id,
      review: reviewComment,
      reviewer: username,
      reviewer_email: auth.email,
      rating: reviewRating,
    });

    console.log(data);

    setLoading(true);
    WPRepository
      .post(
        `${WPDomain}/wp-json/wc/v3/products/reviews?${serializeQuery({
          consumer_key: ck_username,
          consumer_secret: cs_password,
        })}`,
        data,
        {
          headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        // setReviews(res.data);
        setLoading(false);
        if(res.status == 201){
            reviewSuccessful('success')
            router.reload()
            
        }
      })
      .catch((err) => {
        // console.log({err});
        // console.log();
        setLoading(false);
        reviewFailed('warning', err.response.data.message)
      });
  };
  return (
    <>
      <div className="row px-3">
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 ">
          <div className="ps-block--average-rating">
            <div className="ps-block__header">
              {reviews.length !== 0 && <h3>{ratingTotalAverage}.00</h3>}
              {/* <Rating defaultValue={0} /> */}
            </div>
            <div className="mb-5">
              <p className="mb-0">
                {reviews.length} Review{reviews.length > 0 ? "s" : ""}
              </p>
              <Rate
                disabled
                defaultValue={reviews.length > 0 ? ratingTotalAverage : 0}
              />
            </div>

            {/* <div className="ps-block__star">
              <span>5 Star</span>
              <div className="ps-progress" data-value="100">
                <span></span>
              </div>
              <span>100%</span>
            </div>
            <div className="ps-block__star">
              <span>4 Star</span>
              <div className="ps-progress" data-value="0">
                <span></span>
              </div>
              <span>0</span>
            </div>
            <div className="ps-block__star">
              <span>3 Star</span>
              <div className="ps-progress" data-value="0">
                <span></span>
              </div>
              <span>0</span>
            </div>
            <div className="ps-block__star">
              <span>2 Star</span>
              <div className="ps-progress" data-value="0">
                <span></span>
              </div>
              <span>0</span>
            </div>
            <div className="ps-block__star">
              <span>1 Star</span>
              <div className="ps-progress" data-value="0">
                <span></span>
              </div>
              <span>0</span>
            </div> */}
          </div>
        </div>
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 py-3">
          {reviews.length > 0 && (
            <div className="reviews-list mb-5">
              {reviews.map((review) => (
                <div key={review.id} className="rounded px-4 py-3 border">
                  <div className="d-flex justify-content-between">
                    <div
                      className="d-flex align-items-center"
                      style={{ gap: "5px" }}
                    >
                      <Avatar size={40}>{review.reviewer[0]}</Avatar>
                      <p>{review.reviewer}</p>
                    </div>
                    <Rate disabled defaultValue={review.rating} />
                  </div>

                  <hr />

                  <p
                    dangerouslySetInnerHTML={{
                      __html: `${review.review}`,
                    }}
                  ></p>
                </div>
              ))}
            </div>
          )}

          {auth.isLoggedIn && (
            <>
              <form className="ps-form--review" onSubmit={handleReview}>
                <h4>Submit Your Review</h4>
                <p>
                  Your email address will not be published. Required fields are
                  marked
                  <sup>*</sup>
                </p>
                <div className="form-group form-group__rating">
                  <label>Your rating of this product</label>
                  <Rate
                    tooltips={desc}
                    defaultValue={1}
                    onChange={(value) => setReviewRating(value)}
                  />{" "}
                  &nbsp; -{" "}
                  {reviewRating ? (
                    <span className="ant-rate-text">
                      {desc[reviewRating - 1]}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    rows="6"
                    placeholder="Write your review here"
                    onChange={(e) => setReviewComment(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder={auth.username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="email"
                        placeholder={auth.email}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group submit">
                  {!loading ? (
                    <button className="ps-btn">Submit Review</button>
                  ) : (
                    <button className="ps-btn form-load-disabled" disabled>
                      Sending Review...
                      <div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
      {!auth.isLoggedIn && (
        <div className="py-5 mt-2 d-flex justify-content-center ">
          <Link href={"/account/login"} passHref>
            <a className="btn btn-primary btn-lg" style={{ color: "#fff" }}>
              Login to Review Product
            </a>
          </Link>
        </div>
      )}
      <style>{`
        .reviews-list{
            
            overflow-x: hidden;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .reviews{

        }
      `}</style>
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(PartialReview);
