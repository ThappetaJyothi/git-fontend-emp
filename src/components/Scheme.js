import { getSchemeById } from "../redux/SchemeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getSchemeByIdService } from "../service/SchemeService";


const Scheme = () => {

    const [sid, setSid] = useState('');

    const dispatch = useDispatch();

    const schemeDataFromStore = useSelector((state) => state.scheme.schemeState);

    const handleScheme = (e) => {
        console.log('handleScheme');
        setSid(e.target.value);
    }

    const submitGetSchemeById = (evt) => {
        evt.preventDefault();
        console.log('submitGetSchemeById');
        getSchemeByIdService(sid)
            .then((response) => {
                dispatch(getSchemeById(response.data));             // Sending data to redux store

            })
            .catch(() => {
                alert(`Scheme with ${sid} not found.`);
            });

        setSid('');
    }


    return (
        <div className="container">
            <h1 className="display-4 text-primary mt-3 mb-3" >Scheme Component</h1>

            <div className="col-12 border border-light shadow p-3 mb-5 bg-white">
                <h3>Find scheme by id</h3>
                <form className="form form-group form-primary" onSubmit={submitGetSchemeById}>
                    <input className="form-control mt-3" type="number" id="sid" name="sid" value={sid} onChange={handleScheme} placeholder="Enter Scheme Id" autoFocus required />
                    <input className="form-control mt-3 btn btn-primary" type="submit" value="Find Scheme" />
                </form>

                <table className="table table-light table-striped ">
                        <thead>
                            <tr>
                                <th>Scheme Id</th>
                                <th>Name</th>
                                <th>Objective</th>
                                <th>Eligibility</th>
                                <th>Launch Date</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{schemeDataFromStore.schemeId}</td>
                                <td>{schemeDataFromStore.schemeName}</td>
                                <td>{schemeDataFromStore.schemeObjective}</td>
                                <td>{schemeDataFromStore.schemeEligibility}</td>
                                <td>{schemeDataFromStore.schemeLaunchDate}</td>
                                <td>{schemeDataFromStore.schemeType}</td>

                            </tr>
                        </tbody>
                    </table>
                                    
            </div>
        </div>
    );
}


export default Scheme;