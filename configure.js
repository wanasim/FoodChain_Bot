var paypal = require('../');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AeZ3qeMu7Yp_R-BEFuc_fzVuPJCBkTrd3ED2QGbqwTkmqqjY3aFlRWae2jfrfjAGn-uCvoz0M8ZOM0vr',
    'client_secret': 'EG8YKfh8N4SlRGrg1Rb0xygVzNB3fw4GqA26QnFxC2EiStI1zyZzLhkuc_fMJR6YXkBorjf7eK-_Qhrd',
    'headers' : {
		    'custom': 'header'
    }
});
