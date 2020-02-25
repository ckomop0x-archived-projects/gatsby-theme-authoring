import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Event from "../components/Event";

export const query = graphql`
  query($eventID: String) {
    event(id: { eq: $eventID }) {
      name
      url
      startDate(formatString: "MMMM D, YYYY")
      endDate(formatString: "MMMM D, YYYY")
      location
      slug
    }
  }
`;

const EventsTemplate = ({ data: { event } }) => {
  // const events = data.allEvent.nodes;

  return <Layout>
    <Event {...event}/>
  </Layout>;
};

export default EventsTemplate;
