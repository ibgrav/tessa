import Layout from '../../components/Layout';

export default () => {
    return (
        <Layout>
            <style jsx>{`
                #about {
                    width: 700px;
                    margin: 0 auto;
                    box-sizing: border-box;
                }

                #portrait {
                    width: 100%;
                    margin-bottom: 80px;
                }

                #blurb p {
                    line-height: 1.8em;
                    letter-spacing: .02em;
                }

                @media screen and (max-width: 700px) {
                    #about {
                        width: 100%;
                    }
                }
            `}</style>
            <div id="about">
                <img id="portrait" src="../about.jpg"></img>
                <div id="blurb">
                    <p>Through her graduate research, Tessa aims to explore themes of agency and victimhood as they relate to collective trauma and the adaptability of culture in today's anthropogenic era of risk and migration. She is interested in alternative epistemologies that interrogate the politics of knowledge production through reimagining the hegemonic constructs of territory and border. Through a grounded theory approach, she intends to investigate storytelling and its powerful implications for empathy and conflict transformation.</p>
                    <p>Prior to attending the GSD, Tessa worked as an architectural designer at Olson Kundig in Seattle, WA, where she specialized in exhibit design and cultural projects. Alongside the Director of Building Performance, she worked towards integrating Life Cycle Assessments into initial design phases to minimize environmental and health impacts. Tessa cofounded BCSP, a firm that developed feasibility studies and master plans for mixed-tenure and affordable housing developments for the Seattle Office of Housing. She holds a Bachelor of Architecture from the University of Oregon.</p>
                </div>
            </div>
        </Layout>
    );
}