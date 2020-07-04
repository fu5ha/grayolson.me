import React, { PropTypes } from "react"
import Helmet from "react-helmet"
import { BodyContainer, joinUri } from "phenomic"
import { css } from "glamor"
import Loading from "../../components/Loading"
import DOMParser from "dom-parser"

import Svg from "react-svg-inline"
import aboutIcon from "../../icons/about.svg"

import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Hero from "../../components/Hero"
import About from "../../components/About"
// import Art from "../../components/Art"
// import Photos from "../../components/Photos"
// import Code from "../../components/Code"
// import ProjectsPreview from "../../components/ProjectsPreview"
// import BlogPreview from "../../components/BlogPreview"

import {mainStyles} from "../../style-vars"

const styles = {
    html: css(mainStyles.html),
    body: css(mainStyles.text),
    svg: css({
        display: 'flex',
        justifyContonet: 'center',
        ' svg': {
            flex: 1,
            width: '60px',
            height: '60px',
            padding: 0,
        }
    })
}

class Homepage extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
    }
    
    render() {
        const navItems = [
            {
            to: "#about",
            text: "about",
            },
            // {
            // to: "/asteroids/",
            // text: "asteroids"
            // },
            {
            to: "https://www.artstation.com/grayolson",
            text: "art"
            },
            {
            to: "http://flickr.com/grayolson",
            text: "photos"
            },
            {
            to: "/blog/",
            text: "blog"
            },
            {
            to: "https://twitter.com/fu5ha",
            text: "twitter"
            },
            {
            to: "https://github.com/termhn/",
            text: "github"
            }
        ]
        var {
            __url,
            head,
            isLoading
        } = this.props;
        const metaTitle = head.title
        const meta = [
            { property: "og:type", content: "article" },
            { property: "og:title", content: metaTitle },
            {
                property: "og:url",
                content: joinUri(process.env.PHENOMIC_USER_URL, __url),
            }
        ]
        if (!isLoading) {
            var parser = new DOMParser();
            var body = parser.parseFromString(this.props.body,"text/html");
            
            var main = (
                <BodyContainer> 
                    <Hero content={body.getElementById("hero")}/>
                    <Svg svg={aboutIcon} {...styles.svg} />
                    <About content={body.getElementById("about")} />
                </BodyContainer>
            )
        }
        return(
            <div {...styles.html} {...styles.body}>
                <Helmet title={ metaTitle }
                        meta={ meta } />
                <Header items={navItems}/>
                {
                    isLoading
                    ? <Loading />
                    : main
                }
                <Footer />
            </div>
        )
    }
}

                // <Art />
                // <Photos />
                // <Code />
                // <ProjectsPreview />
                // <BlogPreview />

Homepage.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  __filename: PropTypes.string,
  __url: PropTypes.string,
  head: PropTypes.object.isRequired,
  body: PropTypes.string,
  header: PropTypes.element,
  footer: PropTypes.element,
}

Homepage.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Homepage