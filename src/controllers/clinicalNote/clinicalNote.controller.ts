/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import clinicalNote from "../../db/models/clinicalNote.model";

interface clinicalNote {
  doctorId : string,
  subjective :string,
  objective :string,
  assessment :string,
  plan :string,
  patientId: string,
  eventOutcome: string
}

// Function to Create an Appointment
const addClinicalNote = async (
  req,
  res: Response,
  next: NextFunction
) => {
  // Get the data from query body
  const {
    subjective,
    objective,
    assessment,
    plan,
    patientId,
    eventOutcome
  }: clinicalNote = req.body;
  try {

     let doctorId= req.user._id
     if(req.user.role_id != 'doctor'){
        res.status(400).json({
            success: false,
            message : "You Are Not Authorized For Generate Clinical Note "
          })
     }else{
        if(eventOutcome.length <= 0){
            res.status(400).json({
                success: false,
                message : "Please Select Atleast One Checkbox"
              })
         }else{
    
            let eventOutcomeData = JSON.stringify(eventOutcome)
            const newClinicalNote = new clinicalNote({
                doctorId,
                subjective,
                objective,
                assessment,
                plan,
                patientId,
                eventOutcome :eventOutcomeData
            });
           let clinicalNoteData = await newClinicalNote.save();
            if(clinicalNoteData){
                res.status(201).json({
                    success: true,
                    data: newClinicalNote
                })
            } 
         }
     }   
  } catch (Err) {
    console.log(Err);
    res.status(404).json({
      success: false,
      message: "One Or More Required Field is empty"
    })
  }
};


export default { addClinicalNote };
