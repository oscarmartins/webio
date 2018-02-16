export default function (context) {    
    
    const { store } = context  
    if (process && process.browser) {
        store.commit('setLanguage', 'oscar')
        console.log(store.state)
        console.log('plugins persistencejs: process.browser')
    }
    
    if (!process.client) {
        //console.log('plugins persistencejs: !isClient')
		return;
    }

	if (!localStorage.getItem('test')) {
		return;
    }
    /**
	let test = JSON.parse(localStorage.getItem('test'));
	store.commit('setTest', {
		firstProp: test.firstProp,
		secondProp: test.secondProp
    });
    **/
}