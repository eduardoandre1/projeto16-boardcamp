import dayjs from "dayjs";
function rent_list_formater(object){
    object.game = {id:object.gameindentific,name:object.game_name};
    object.customer ={id:object.userid, name:object.client};
    object.rentDate = dayjs(object.rentDate).format("YYYY-MM-DD")
    delete object.gameindentific;
    delete object.game_name;
    delete object.userid;
    delete object.client;
    if(object.returnDate){
        object.returnDate = dayjs(object.returnDate).format("YYYY-MM-DD")
    }
    return object
}
export default rent_list_formater