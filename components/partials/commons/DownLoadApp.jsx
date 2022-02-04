import React from 'react';
import {FaDownload} from 'react-icons/fa';

const DownloadApp = () => (
    <>
    <section className="ps-download-app">
        <div className="ps-container">
            <div className="ps-block--download-app">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ">
                            <div className="ps-block__thumbnail">
                                <img src="/static/img/app.jpg" alt="Virem" />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ">
                            <div className="ps-block__content">
                                <h3>Download Virem Mobile App Now!</h3>
                                <p>
                                    Shopping fastly and easily more with our app. Get a link to
                                    download the app on your phone
                                </p>
                                {/* <form
                                    className="ps-form--download-app"
                                    action="do_action"
                                    method="post">
                                    <div className="form-group--nest">
                                        <input
                                            className="form-control"
                                            type="Email"
                                            placeholder="Email Address"
                                        />
                                        <button className="ps-btn">Get Link</button>
                                    </div>
                                </form> */}
                                <p className="download-link">
                                    <button className='button'>
                                        <span>Download Now</span>
                                        <FaDownload />
                                    </button>
                                    {/* <a href="#">
                                        <img src="/static/img/google-play.png" alt="Download Virem Android App" />
                                    </a>
                                    <a href="#">
                                        <img src="/static/img/app-store.png" alt="Download Virem iOS App" />
                                    </a> */}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <style jsx>{`
        .button {
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          background-color: #202020;
          color: #fff;
          display: flex;
          gap: 8px;
          align-items: center;
          transition: all 0.3s ease-in-out;
        }

        .button:hover{
            background-color: #000;
        }
      `}</style>
    </>
);

export default DownloadApp;
