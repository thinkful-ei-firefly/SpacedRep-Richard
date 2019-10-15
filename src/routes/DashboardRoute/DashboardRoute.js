import React, { Component } from 'react'
// import components
import WordsList from '../../components/WordsList/WordsList'
import Button from '../../components/Button/Button'
// import context
import LanguageContext from '../../contexts/LanguageContext'
// import services
import LanguageApiService from '../../services/language-api-service'
// import css
import './dashboardRoute.css'

class DashboardRoute extends Component {
  
  static contextType = LanguageContext;
  
  componentDidMount() {
    console.log('mounted')
    LanguageApiService.getLanguage()
      .then( results => {
          this.context.setLanguage(results.language)
          this.context.setWords(results.words)
      })
      .then(() => {
        console.log(this.context.words)
        this.setState({ loading: false })
      })
  }

  render() {
    if(this.context.loading)
      return(
        <div className="loading">
          Loading
        </div>
      )
    else
      return (
        <section className="dashBoard">
          <div className="subheader">
            <h2 className="language">{ this.context.language.name }</h2>
            <Button
              className="button">
              Start
            </Button>
          </div>
          <WordsList />
        </section>
      );
  }
}

export default DashboardRoute
