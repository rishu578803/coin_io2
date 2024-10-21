import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./page.module.css";
import Signup from "./signup/page";

export default function Home() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
          <Signup/>
          </div>
        </div>
    </div>

    
    </>
  );
}
