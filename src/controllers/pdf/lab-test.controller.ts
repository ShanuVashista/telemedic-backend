/* eslint-disable no-useless-escape */
import Appointment from '../../db/models/appointment.model';
import pdf from 'html-pdf';
const Lab_Test = async (req, res) => {
    try {
        const { id } = req.query;
        let result = await Appointment.findById(id).populate('patient_details').populate('doctor_details');
        result = JSON.parse(JSON.stringify(result));
        console.log(result,'-****************-');
        res.render('general-test', { name: result['doctor_details'].name,address: result['doctor_details'].current_practise_address[0].address, city: result['doctor_details'].current_practise_address[0].city },(err,data)=>{
            console.log(data,'----------===========');
            pdf.create(data).toFile("../../../report.pdf", function (err, data) {
                console.log(err,data,'===========');
                
                // if (err) {
                //     res.send(err);
                // } else {
                //     res.send("File created successfully",data);
                // }
            });
        })
        

    } catch (error) {
        res.status(400).json({
            status: false,
            type: 'error',
            message: error.message
        });
    }
}
export default Lab_Test