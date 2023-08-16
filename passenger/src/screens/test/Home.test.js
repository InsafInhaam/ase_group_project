// import React from "react";
// import { render } from "@testing-library/react";
// import Home from "../Home"; // Update the path to the correct location of your Home component

// describe("Home Component", () => {
//   it("should render Navbar", () => {
//     const { getByText } = render(<Home />);
//     const navbarElement = getByText("COLOMBO EXPRESS");
//     expect(navbarElement).toBeInTheDocument();
//   });

// //   it("should render about section", () => {
// //     const { getByText } = render(<Home />);
// //     const aboutElement = getByText("About our Train Ticket Booking");
// //     expect(aboutElement).toBeInTheDocument();
// //   });

// //   it("should render gallery section", () => {
// //     const { getByText, getByAltText } = render(<Home />);
// //     const galleryElement = getByText("Galery View");
// //     expect(galleryElement).toBeInTheDocument();

// //     const galleryImage = getByAltText("galerImg");
// //     expect(galleryImage).toBeInTheDocument();
// //   });

// //   it("should render customer review section", () => {
// //     const { getByText, getAllByText } = render(<Home />);
// //     const reviewElement = getByText("Customer reviews");
// //     expect(reviewElement).toBeInTheDocument();

// //     const reviewStars = getAllByText("fa-star");
// //     expect(reviewStars).toHaveLength(20); // Assuming each card has 5 stars
// //   });

// //   it("should render contact us section", () => {
// //     const { getByText, getByLabelText, getAllByText } = render(<Home />);
// //     const contactElement = getByText("Contact Us");
// //     expect(contactElement).toBeInTheDocument();

// //     const contactForm = getByLabelText("Your name");
// //     expect(contactForm).toBeInTheDocument();

// //     const contactButton = getByText("Feel free to contact");
// //     expect(contactButton).toBeInTheDocument();

// //     const socialIcons = getAllByText("icon/");
// //     expect(socialIcons).toHaveLength(4); // Assuming 4 social icons
// //   });

// //   it("should render footer section", () => {
// //     const { getByText } = render(<Home />);
// //     const footerElement = getByText("COLOMBO EXPRESS");
// //     expect(footerElement).toBeInTheDocument();
// //   });

//   // You can add more tests for specific behaviors as needed
// });