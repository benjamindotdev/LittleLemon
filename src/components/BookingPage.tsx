import "react-datepicker/dist/react-datepicker.css";
import { BookingPageForm } from "./BookingPageForm"
import { animated, useSpring } from "@react-spring/web";

export const BookingPage = (props: BookingPageProps) => {

    const fade = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 100
      })

    return (
        <animated.main className="booking" style={{...fade}}>
            <BookingPageForm
                occasions={props.occasions}
                guests={props.guests}
                availableTimes={props.availableTimes}
                show={props.show}
                handleComplete={props.handleComplete}
                toggleShowTimes={props.toggleShowTimes}
                toggleShowUser={props.toggleShowUser}
                toggleShowSubmit={props.toggleShowSubmit}
                handleAnotherBooking={props.handleAnotherBooking}
                ACTION={props.ACTION} />
        </animated.main>
    )
};