import React from "react";
import About from "../sections/About";
import Header from "../components/Header";
import Landing from "../sections/Landing";
import Layout from "../components/Layout";
import Projects from "../sections/Projects";
import Footer from "../components/Footer";
import Helmet from "../components/Helmet";

/*
import Writing from "../sections/Writing";
*/

const IndexPage = () => (
  <Layout>
    <Landing />
    <Header />
    <About />
    <Projects />
    <Footer />
  </Layout>
);

export const Head = () => <Helmet />;

export default IndexPage;
