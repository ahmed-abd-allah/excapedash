import axiosApi from "../axios";
export default{
    async getOrder(id) {
        return  await axiosApi
            .get(`/orders/${id}`)
            .then(res => {
                console.log(res.data)
                return res.data
              
            })
            .catch(e => {
  
              console.log(e);
            });
        
      },
    async changeStatus(status,id){
        return await  axiosApi
        .patch(`/orders/${id}`, {
          status: status
        })
        .then(response => {
            return response
        })  .catch(e => {
  
            console.log(e);
          });
    }
}
