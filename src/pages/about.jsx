import React from 'react';
import Helmet from 'react-helmet';
import config from '../../data/SiteConfig';
import MainHeader from '../components/Layout/Header';
import About from '../components/About/About';

class AboutPage extends React.Component {
  render() {
    return (
      <div className="index-container">
        <Helmet title={config.siteTitle} />
        <main>
          <MainHeader
            siteTitle={config.siteTitle}
            siteDescription={config.siteDescription}
            location={this.props.location}
            logo={config.siteLogo}
          />
          <About />
        </main>
      </div>
    );
  }
}

export default AboutPage;
