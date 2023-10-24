import React,{useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import "../../style/Mypage/MypageMenu.scss";
import heart from "../../image/Mypage/heart.png";
import coupon from "../../image/Mypage/coupon.png";
import chat from "../../image/Mypage/chat.png";
import review from "../../image/Mypage/review.png";
import { userInfoAtom } from '../../recoil/Mypage/MyPageAtom';
import { myPage } from '../../hooks/MyPage/MyPageType';
import { useRecoilValue } from 'recoil';
import { useRecoilState } from 'recoil';
import { MyPageReviewListState } from '../../recoil/Mypage/MyPageReviewListAtom';
import { getMypageReviewList } from '../../apis/myPage/MyPageReviewListApi';
import { MyPageCouponListState } from '../../recoil/Mypage/MyPageCouponListAtom';
import { getMypageCouponList } from '../../apis/myPage/MyPageCouponListApi';


const MypageMenu = () => {

  const userInfo = useRecoilValue<myPage>(userInfoAtom);

  const navigate = useNavigate();

  const [ReviewList,setReviewList] = useRecoilState(MyPageReviewListState);
  const [CouponList,setCouponList] = useRecoilState(MyPageCouponListState);

  const HandleFavoriteOnclick = () => {
    navigate("/MypageFavorite");

  }
  const HandleCouponOnclick = async () => {
    try {
      const res = await getMypageCouponList();
      if(res){
        setCouponList(res.data.buyable_coupons);
      }
      navigate("/MyPageCoupon");
    } catch (error){
      console.error("couponlist 에러",error);
    }
  }

  const HandleChat = () => {
    navigate("/MyPageChat");
  }

  useEffect(()=>{
    getMypageReviewList();
    getMypageCouponList();
  });

  const HandleReviewOnclick = async () => {
    try {
      const res = await getMypageReviewList();
      if(res){
        setReviewList(res.data.reviews);
      } 
      navigate("/MyPageReview");
    } catch (error){
      console.error("reviewonclic에러", error);
    };
  }


  return (
    <div className='MypageMenu'>
      <div className='MypageMenuSelect'>
        <div className='MypageMenuSection'>
            <img src={heart} alt='heart' className='MypageMenuIcon' onClick={HandleFavoriteOnclick}/>
            <span>찜 목록</span>
            <span>{userInfo.favoriteCount}</span>
        </div>
        <div className='MypageMenuSection' onClick={HandleCouponOnclick}>
            <img src={coupon} alt='heart' className='MypageMenuIcon'/>
            <span>쿠폰함</span>
            <span>{userInfo.couponCount}</span>
        </div>
        <div className='MypageMenuSection' onClick={HandleChat}>
            <img src={chat} alt='heart' className='MypageMenuIcon'/>
            <span>채팅</span>
            <span>{userInfo.chatRoomCount}</span>
        </div>
        <div className='MypageMenuSection' onClick={HandleReviewOnclick}>
            <img src={review} alt='heart' className='MypageMenuIcon'/>
            <span>후기</span>
            <span>{userInfo.reviewCount}</span>
        </div>
      </div>
    </div>
  )
}

export default MypageMenu
