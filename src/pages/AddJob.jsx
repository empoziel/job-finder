import { statusOptions, typeOptions } from "../constant";
import { v4 } from "uuid";
import { addJob } from "../redux/jobSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    //create an object from form data

    const dataObj = Object.fromEntries(formData);

    //add id to obj

    dataObj.id = v4();

    // add create date
    dataObj.date = new Date().toLocaleDateString();

    //! update api
    axios.post("http://localhost:3030/jobs", dataObj).then(() => {
      // update store
      dispatch(addJob(dataObj));
      // redirect homepage
      navigate("/");

      toast.success("Added successfully", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
    });
  };
  return (
    <div className="add-sec">
      <h2>Add New Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Position</label>
          <input name="position" type="text" />
        </div>
        <div className="field">
          <label>Company</label>
          <input name="company" type="text" />
        </div>
        <div className="field">
          <label>Location</label>
          <input name="location" type="text" />
        </div>
        <div className="field">
          <label>Status</label>
          <select name="status">
            {statusOptions.map((opt) => (
              <option key={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Type</label>
          <select name="type">
            {typeOptions.map((opt) => (
              <option key={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <button>Add</button>
      </form>
    </div>
  );
};

export default AddJob;
