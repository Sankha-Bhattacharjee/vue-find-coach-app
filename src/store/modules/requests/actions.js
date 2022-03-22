export default {
    async contactCoach(context, payload){
        const newRequest = {
            userEmail: payload.email,
            message: payload.message,
        };
        const response = await fetch(`https://vue-find-coach-cb874-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,{
            method: 'POST',
            body: JSON.stringify(newRequest)
        });
        const responseData = await response.json();
        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to send data.');
            throw error;
        }

        newRequest.id = responseData.name; //firebase adds id in a name field
        newRequest.coachId = payload.coachId;
        context.commit('addRequests', newRequest);
    },
    async fetchRequests(context){
        const coachId = context.rootGetters.getUserId;
        const token = context.rootGetters.getToken;
        console.log(token);
        const response = await fetch(`https://vue-find-coach-cb874-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=`+token);

        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to fetch data.');
            throw error;
        }

        const requests =[];
        for(let key in responseData){
            const request = {
                id: key,
                coachId: coachId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message
            };
            requests.push(request);
        }
        context.commit('setRequests',requests);

    }
};