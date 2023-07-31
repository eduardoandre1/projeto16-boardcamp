
export default function input_validate(schema){
    return (req,res,next)=>{
    const input_test =schema.validate(req.body,{abortEarly:false})
    if(input_test.error){
        return res.status(400).send(input_test.error)
    }
    next()
    }
}