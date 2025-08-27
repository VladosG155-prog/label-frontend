import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InfoRelease from "./steps/step1";
import TrackUploadForm from "./steps/step2";
import DistributionPlatforms from "./steps/step3";

export default function AddRelease() {

  const [step, setStep] = useState(0)

  const [formData, setFormData] = useState({
    releaseType: "",
    cover: null,
    mainArtist: "",
    additionalArtists: "",
    featuringArtists: "",
    releaseTitle: "",
    version: "",
    label: "",
    releaseDate: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSelectChange = (name) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };


  const renderStep = () => {
    switch(step){
        case 0:
            return <InfoRelease/>


        case 1:
            return <TrackUploadForm/>


        case 2:
            return <DistributionPlatforms/>

        default:
            return null
    }
  }

  return (
   <div className="pt-5">
     {renderStep()}
     <Button onClick={() => setStep(1)}>Следующий шаг</Button>
      <Button onClick={() => setStep(2)}>3 шаг</Button>
      <Button onClick={() => setStep(0)}>Предыдущий шаг</Button>
   </div>
  );
}