import { Spinner } from "react-bootstrap";

export default function FullSpinner(){
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{width:'100%', height:'100vh'}}>
      <Spinner 
        animation="border" 
        role="status"
        size="lg"
      />
      <p className="my-3" style={{textAlign:'center'}}>טוען...</p> 
    </div>
  )
}