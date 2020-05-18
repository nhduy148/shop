// import { combineReducers } from 'redux';
import {
  ALL_PRODUCT,
  LASTEST_PRODUCT,
  RELATED_PRODUCT,
  FEATURE_PRODUCT,
  FIND_PRODUCT,
  GET_CART,
  CART_ARRAY,
  ADD_TO_CART,
  WISHLIST,
  ADD_WISHLIST,
  WISHLIST_ARRAY,
  PRODUCT_VIEW,
  PRODUCT_DETAILS,
  GET_USERNAME,
  LOGIN_ACTION,
  VALIDATION_REGISTER,
  // CHECK_IS_ADMIN,
  USER_INFO,
  GET_HOME_BLOG,
  GET_ARCHIVE_BLOG,
  GET_BLOG_DETAILS,
  GET_BRANDS,
  GET_CATEGORIES,
  SIDEBAR_ITEM,
  SIDEBAR_FILTER,
  SHOW_POPUP,
  PRODUCT_SLIDES,
  TOTAL_PRODUCT,
} from './actions';


const defaultState = {
  sidebarPrice : [
    { 
      type: "mobile",
      data : [
        { option: [[2000000], "Under 2 million"] },
        { option: [[2000000, 4000000], "From 2 - 4 million"] },
        { option: [[4000000, 7000000], "From 4 - 7 million"] },
        { option: [[7000000, 13000000], "From 7 - 13 million"] },
        { option: [[0, 0, 13000000], "Over 13 million"] },
      ]
    },
    {
      type: "tablet",
      data : [
        { option: [[3000000], "Under 3 million"] },
        { option: [[3000000, 10000000], "From 3 - 10 million"] },
        { option: [[0, 0, 10000000], "Over 10 million"] },
      ]
    },
    { 
      type: "laptop",
      data : [
        { option: [[10000000], "Under 10 million"] },
        { option: [[10000000, 15000000], "From 10 - 15 million"] },
        { option: [[15000000, 25000000], "From 15 - 25 million"] },
        { option: [[0, 0, 25000000], "Over 25 million"] },
      ]
    },
    { 
      type: "all",
      data : [
        { option: [[2000000], "Under 2 million"] },
        { option: [[2000000, 4000000], "From 2 - 4 million"] },
        { option: [[4000000, 10000000], "From 4 - 10 million"] },
        { option: [[10000000, 15000000], "From 10 - 15 million"] },
        { option: [[15000000, 25000000], "From 15 - 25 million"] },
        { option: [[0, 0, 25000000], "Over 25 million"] },
      ]
    }
  ],

  archiveBlogList: [],
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case SHOW_POPUP:
      return { ...state, popupName: action.popupName }

    case RELATED_PRODUCT:
      return{ ...state, relatedItem: action.relatedItem }

    case TOTAL_PRODUCT:
      return { ...state, totalProducts: action.totalProducts }

    case ALL_PRODUCT:
      return { ...state, allItem: action.allItem, allItemRes: action.allItemRes, allstrError: action.allstrError };

    case LASTEST_PRODUCT:
      return { ...state, lastestItem : action.lastestItem, lastestRes: action.lastestRes };

    case FEATURE_PRODUCT:
      return { ...state, featureItem : action.featureItem, featureRes: action.featureRes };
      
    case FIND_PRODUCT:
      return { ...state, searchItem : action.searchItem };
      
    case GET_CART:
      return { 
        ...state,
        cartItem: action.cartItem,
        cartID: action.cartID,
        cartRes: action.cartRes
      };
      
    case CART_ARRAY:
      return{
        ...state,
        cartArr: action.cartArr,
      }

    case ADD_TO_CART:
      return {
        ...state,
        addError: action.addError,
        addSuccess: action.addSuccess,
      }

    case WISHLIST:
      return {
        ...state,
        wishlistItem: action.wishlistItem,
        wishRes: action.wishRes,
      }

    case ADD_WISHLIST:
      return{
        ...state,
        addWishStatus: action.addWishStatus,
        removeWishStatus: action.removeWishStatus,
      }
      
    case WISHLIST_ARRAY:
      return{
        ...state,
        wishArr: action.wishArr,
      }

    case PRODUCT_VIEW:
      return { ...state, viewItem: action.viewItem, showView: action.showView };

    case PRODUCT_DETAILS:
      return { ...state, productItem: action.productItem, detailsRes: action.detailsRes };
    
    case GET_USERNAME:
      return {
        ...state,
        getUsername: action.getUsername,
        hasUsername: action.hasUsername,
        getUsernameError: action.getUsernameError,
        getUsernameSuccess: action.getUsernameSuccess
      }

    case LOGIN_ACTION:
      return {
        ...state,
        loginSuccess: action.loginSuccess,
        loginError: action.loginError 
      };

    case VALIDATION_REGISTER:
      return {
        ...state,
        userError: action.userError,
        emailError: action.emailError,
        passError: action.passError,
        passConfirmError: action.passConfirmError,
        phoneError: action.phoneError
      }

    // case CHECK_IS_ADMIN:
    //   return {
    //     ...state,
    //     isAdmin: action.isAdmin,
    //   }

    case USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
      }

    case GET_HOME_BLOG:
      return {...state, homeBlogItem: action.homeBlogItem, blogRes: action.blogRes}

    case GET_ARCHIVE_BLOG:
      return {...state, archiveBlogList: action.archiveBlogList, archiveBlogStatus: action.archiveBlogStatus}
    
    case GET_BLOG_DETAILS:
      return {...state, blogDetails: action.blogDetails, blogDetailsStatus: action.blogDetailsStatus }

    case SIDEBAR_FILTER:
      return {...state, sideBarProductFilter: action.sideBarProductFilter}

    case GET_CATEGORIES:
      return { ...state, catItem: action.catItem, catRes: action.catRes }
      
    case GET_BRANDS:
      return{ ...state, brandItem: action.brandItem, brandRes: action.brandRes }

    case SIDEBAR_ITEM:
      return{ 
        ...state,
        sidebarItem: [
          { item: "category", data: action.sideCategory },
          { item: "brand", data: action.sideBrand },
          { item: "price", data: [...state.sidebarPrice] },
        ]
      }

    case PRODUCT_SLIDES:
      return{
        ...state,
        proSlideItem: action.proSlideItem
      }

    default:
      return state;
  }
};
export default reducer;
