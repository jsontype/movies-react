import { Fragment, memo } from "react";

//components
import TeamSection from "./AboutSections/TeamSection";
import ContactUs from "./AboutSections/ContactUs";
import WorkSection from "./AboutSections/WorkSection";

//custom hook
import { useBreadcrumb } from "@/utilities/usePage";

const AboutUs = memo(() => {
  useBreadcrumb('About us')
  return (
    <>
      <TeamSection></TeamSection>
      <ContactUs></ContactUs>
      <WorkSection></WorkSection>
    </>
  );
});

AboutUs.displayName = "AboutUs";
export default AboutUs;
