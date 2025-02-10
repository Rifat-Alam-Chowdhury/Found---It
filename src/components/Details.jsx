import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { use } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthContextGoogle } from "../Auth/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

function Details() {
  const { id } = useParams();
  const { user } = useContext(AuthContextGoogle);
  const navigate = useNavigate();

  const HandleClaim = async (id) => {
    await axios
      .post(`${import.meta.env.VITE_URL}claim/${id}`, {
        email: user.email,
      })
      .then((response) => {
        toast.success("Claimed Successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error("error");
      });
  };

  const fetchData = async () => {
    try {
      const response = await axios(`${import.meta.env.VITE_URL}details/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["Details"],

    queryFn: fetchData,
    staleTime: 10000,
    cacheTime: 300000,
    refetchInterval: 300000,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: true,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Helmet>
        <title>Details</title>
      </Helmet>

      <Toaster />
      <div className="p-10">
        {data?.map((data) => (
          <div className="card  w-11/12 shadow-xl">
            <figure>
              <img className="object-cover" src={data.url} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{data.item}</h2>
              <p>{data.category}</p>

              <p>{data.description}</p>
              <p>{data.status}</p>
              <p>{data.location}</p>
              {data?.PostedBy === user.email ? (
                <p>Posted by :You</p>
              ) : (
                <p>Posted by :{data.PostedBy}</p>
              )}

              <div className="card-actions justify-end">
                <button
                  disabled={data?.PostedBy === user.email || data?.claimed}
                  onClick={() => HandleClaim(data._id)}
                  className="btn border-2"
                >
                  Claim
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Details;
