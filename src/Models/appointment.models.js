import { model, Schema } from "mongoose";

const appointmentSchema= new Schema({
    name:{type:String, required:true},
    time:{type:String, required:true},
    email:{type:String, required:true},
    phoneNumber:{type:String, required:true},
    date:{type:String, required:true},
    time:{type:String, required:true},
    purpose:{type:String, required:true},
    specialization:{type:String, required:true}
})

const appointmentModel= model('appointment', 'appointmentSchema', appointments)

export default appointmentModel