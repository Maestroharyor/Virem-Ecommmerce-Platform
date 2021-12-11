import {Spin} from 'antd'
    
    function Spinner (){
    return(
       <div className="custom_pageloader">
           <Spin size="large" />
        {/* <div className="spinner-grow text-danger" role="status">
            <span class="sr-only">Loading...</span>
        </div> */}
    </div> 
    )
}

export default Spinner;
