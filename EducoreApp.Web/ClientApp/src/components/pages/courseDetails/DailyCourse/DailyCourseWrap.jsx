import React, { useContext } from "react";
import moment from 'moment'
import BuyAudioCourse from "./BuyAudioCourse";
import { AppContext } from "../../../../plugins/AppContext";
function DailyCourseWrap() {
    const contextObj = useContext(AppContext);
    

    return (
        <>
            <div className="package-details-wrapper pt-90">
                <div className="container">
                    <div className="row pt-3">
                        <div className="col-md-12" >
                            <div>
                                <div
                                    className="package-card-alpha d-flex p-4 align-items-center"
                                    style={{ fontSize: "25px", cursor: "pointer" }}
                                >
                                    <i class="bi bi-mic"></i>
                                    <h3 className="px-5">
                                        {moment().format("DD/MM/YYYY")}
                                    </h3>

                                    <audio src={"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"} controls controlsList="nodownload" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="tour-package-details">

                                <>
                                    <div className="package-details-tabs">
                                        <div
                                            className="tab-pane fade show active package-info-tab mt-3"
                                            id="pill-body1"
                                            role="tabpanel"
                                            aria-labelledby="pills-package1"
                                        >
                                            <h3 className="d-subtitle">Daily market update</h3>
                                            <p>

                                                💡 Key Benefits of the Daily Market Analysis Course:
                                                <br />
                                                1️⃣ Time-Efficient: Say goodbye to long hours of research. Our voice notes provide you with succinct yet comprehensive market updates, saving you precious time.
                                                <br />
                                                2️⃣ Actionable Insights: With our team of experts monitoring the market's ups and downs, you'll receive informed advice on potential investment opportunities.
                                                <br />
                                                3️⃣ Convenience: Listen to the voice notes while commuting, working out, or relaxing. We bring the analysis to you, no matter where you are.
                                                <br />
                                                4️⃣ Stay Ahead: By being aware of market trends, you'll be better equipped to make strategic investment decisions, potentially maximizing your returns.
                                                <br />

                                                🚀 Join Our Course Now!
                                                Don't miss out on this exclusive opportunity to gain a competitive edge in the stock market. Enroll in our Daily Market Analysis Course today and embark on a journey of informed investing. Whether you're a seasoned trader or a beginner taking your first steps, our course caters to all levels of experience.

                                                Visit our website [insert website link] to sign up now and be among the first to receive our insightful voice notes, enabling you to stay ahead in the dynamic world of stocks. Seize the opportunity and start making smarter investment choices today!

                                                📈📉 The stock market waits for no one. Stay informed, stay ahead, and let our Daily Market Analysis Course be your guide to success. Enroll now! 📊🚀
                                            </p>
                                        </div>

                                    </div>
                                </>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="package-sidebar">
                                <BuyAudioCourse user={contextObj?.user}/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default DailyCourseWrap;
