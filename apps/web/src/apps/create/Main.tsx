import RForm from "./RForm";
import api from "../../api";
import { useState } from "react";
import RPreview from "./RPreview";
import { useNavigate } from "react-router-dom";
import { CreateParty } from "../../models/Party";
// import { CustomRestaurant, Restaurant } from "../../models/Restaurant";
import {
  PersonalType,
  RFormType,
  addChecks,
  getCheckedRestaurants,
  pInitial,
  rValuesInitial,
} from "./CreateHelpers";

// type R = (Restaurant | CustomRestaurant)[];
type R = any;

const Main = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [offset, setOffset] = useState(10);
  const [rError, setRError] = useState("");
  const [restaurants, setRestaurants] = useState<R>();
  const [submitting, setSubmitting] = useState(false);
  const [rFormData, setrFormData] = useState(rValuesInitial);
  const [personalData, setPersonalData] = useState(pInitial);

  const fetchRestaurants = async (rFormData: RFormType) => {
    console.log("fetching");
    setStep(1);
    setrFormData(rFormData);
    setRestaurants(undefined);
    setSubmitting(true);
    try {
      const restaurants = await api.fetchRestaurants(rFormData);
      const withChecks = addChecks(restaurants);
      setRestaurants(withChecks);
      setRError("");
    } catch {
      setStep(0);
      setRError(
        "There was an error fetching restaurants. Try a different location."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const fetchMore = async () => {
    try {
      const existingIds = restaurants?.map((r: any) => r.id) || [];
      const data = {
        ...rFormData,
        offset,
        excludeIds: existingIds,
      };
      const newRestaurants = await api.fetchRestaurants(data);
      const withChecks = addChecks(newRestaurants);
      setOffset((prevState) => prevState + 10);
      setRestaurants((prevState: any) => {
        if (!prevState) return withChecks;

        // Filter out duplicates based on restaurant id (as backup)
        const existingIds = new Set(prevState.map((r: any) => r.id));
        const uniqueRestaurants = withChecks.filter(
          (r: any) => !existingIds.has(r.id)
        );

        return [...uniqueRestaurants, ...prevState];
      });
      setRError("");
    } catch {
      setStep(0);
      setRError(
        "There was an error fetching restaurants. Try a different location."
      );
    }
  };

  const createParty = async (personalData: PersonalType) => {
    if (!restaurants) return;
    setPersonalData(personalData);

    const data = {
      restaurants: getCheckedRestaurants(restaurants),
      ...rFormData,
      vote_on_hours: false,
      vote_on_days: false,
      max_voters: 0,
      password: "",
      days_to_vote_on: [],
      hours_to_vote_on: [],
    } as CreateParty;
    try {
      setSubmitting(true);
      const party = await api.createParty(data);
      navigate("/party/" + party._id + "?new=true");
    } catch {
      setSubmitting(false);
      setRError("There was an error creating your party. Try again.");
      console.log("error");
    }
  };

  const steps = [
    {
      component: () => (
        <RForm
          rError={rError}
          formData={rFormData}
          fetchRestaurants={fetchRestaurants}
        />
      ),
    },
    {
      component: () => {
        return (
          <RPreview
            setStep={setStep}
            fetchMore={fetchMore}
            restaurants={restaurants}
            submitting={submitting}
            setRestaurants={setRestaurants}
            createParty={() => createParty(personalData)}
          />
        );
      },
    },
  ];

  return <>{steps[step].component()}</>;
};

export default Main;
