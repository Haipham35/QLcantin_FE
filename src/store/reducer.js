import * as actionTypes from './actions';
import config from './../config';

const initialState = {
    isOpen: [], //for active default menu
    isTrigger: [], //for active default menu, set blank for horizontal
    ...config,
    isFullScreen: false, // static can't change
    billingdatarecord: [],
    loginIndicator:0,
    billtotal:0
};

const reducer = (state = initialState, action) => {
    let trigger = [];
    let open = [];

    switch (action.type) {
        case actionTypes.COLLAPSE_MENU:
            return {
                ...state,
                collapseMenu: !state.collapseMenu
            };
            case actionTypes.LOGIN_INDICATOR:

            console.log ("Login value is" + action.loginIndicator)
                return {
                    ...state,
                    loginIndicator: action.loginIndicator,
                };
        case actionTypes.COLLAPSE_TOGGLE:
            if (action.menu.type === 'sub') {
                open = state.isOpen;
                trigger = state.isTrigger;

                const triggerIndex = trigger.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    open = open.filter(item => item !== action.menu.id);
                    trigger = trigger.filter(item => item !== action.menu.id);
                }

                if (triggerIndex === -1) {
                    open = [...open, action.menu.id];
                    trigger = [...trigger, action.menu.id];
                }
            } else {
                open = state.isOpen;
                const triggerIndex = (state.isTrigger).indexOf(action.menu.id);
                trigger = (triggerIndex === -1) ? [action.menu.id] : [];
                open = (triggerIndex === -1) ? [action.menu.id] : [];
            }

            return {
                ...state,
                isOpen: open,
                isTrigger: trigger
            };
        case actionTypes.NAV_CONTENT_LEAVE:
            return {
                ...state,
                isOpen: open,
                isTrigger: trigger,
            };

        case actionTypes.BILLING_DATA:

            const billingdatamerge = state.billingdatarecord.concat(action.billingdatarecord)
            const sumofbillingdatamerge = billingdatamerge.reduce((a, c) => {
                let x = a.find(e => e.barcode === c.barcode)
                if (!x) a.push(Object.assign({}, c))
                else 
                x.size += c.size
                return a
            }, [])
            var totalbill=0;
            sumofbillingdatamerge.map((bill)=>{
                totalbill+=bill["size"]*bill["price"];
            })
            return {
                ...state,
                billingdatarecord: sumofbillingdatamerge,
                billtotal:totalbill
            };

        case actionTypes.EDIT_BILLING_DATA:

            const editbillingdatamerge = action.editbillingdatarecord
            const editsumofbillingdatamerge = editbillingdatamerge.reduce((a, c) => {
                let x = a.find(e => e.barcode === c.barcode)
                if (!x) a.push(Object.assign({}, c))
                else x.size += c.size
                return a
            }, [])
            var totaleditbill=0;
            editsumofbillingdatamerge.map((bill)=>{
                totaleditbill+=bill["size"]*bill["price"];
            })
            console.log("*********")
            console.log(totaleditbill)
            console.log("*************")
            return {
                ...state,
                billingdatarecord: editsumofbillingdatamerge,
                billtotal:totaleditbill
            };

        case actionTypes.NAV_COLLAPSE_LEAVE:
            if (action.menu.type === 'sub') {
                open = state.isOpen;
                trigger = state.isTrigger;
                const triggerIndex = trigger.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    open = open.filter(item => item !== action.menu.id);
                    trigger = trigger.filter(item => item !== action.menu.id);
                }
                return {
                    ...state,
                    isOpen: open,
                    isTrigger: trigger,
                };
            }
            return { ...state };

            case actionTypes.EMPTY_BILLING_DATA:
            return {
                ...state,
                billingdatarecord: [],
                billtotal:0
            };

            
        case actionTypes.FULL_SCREEN:
            return {
                ...state,
                isFullScreen: !state.isFullScreen
            };
        case actionTypes.FULL_SCREEN_EXIT:
            return {
                ...state,
                isFullScreen: false
            };
        case actionTypes.CHANGE_LAYOUT:
            return {
                ...state,
                layout: action.layout
            };
        default:
            return state;
    }
};

export default reducer;