import React, { Fragment } from "react";

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from "../api";

/**
 * We need a new component called Searchable which:
 *
 * Has a template like this:
 *
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 *
 * When someone clicks the anchor tag, you should:
 *
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 *
 * Then start a try/catch/finally block:
 *
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch:
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = ({searchTerm, searchValue, setIsLoading, setSearchResults}) => {
    return <span className="content">
        <a href="#" onClick={async (event) => {
            event.preventDefault()
            setIsLoading(true)

            try {
                const results = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue)
                setSearchResults(results)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }}> {searchValue}</a>
    </span>
};

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 *
 * <main id="feature"></main>
 *
 * And like this when one is:
 *
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 *
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style,
 * technique, medium, dimensions, people, department, division, contact, creditline
 *
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 *
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 *
 * This component should be exported as default.
 */
const Feature = ({featuredResult, setSearchResults, setIsLoading}) => {
    if(!featuredResult){
        return <main id="feature"></main>
    }  return  <main id="feature">
            <div className="object-feature">
                <header>
                    <h3>{featuredResult.title}</h3>
                    <h4>{featuredResult.dated}</h4>
                </header>
                <section>
                {featuredResult.description ? (
                <section className="facts">
                    <span className="title">Description</span>
                    <span className="content">{featuredResult.description}</span>
                </section>
                ) : null}
                </section>
                <section>
                {featuredResult.style ? (
                <section className="facts">
                    <span className="title">Style</span>
                    <span className="content">{featuredResult.style}</span>
                </section>
                ) : null}
                </section>
                <section>
                {featuredResult.dimensions ? (
                <section className="facts">
                    <span className="title">Dimensions</span>
                    <span className="content">{featuredResult.dimensions}</span>
                </section>
                ) : null}
                </section>
                <section>
                {featuredResult.department ? (
                <section className="facts">
                    <span className="title">Department</span>
                    <span className="content">{featuredResult.department}</span>
                </section>
                ) : null}
                </section>
                <section>
                {featuredResult.division ? (
                <section className="facts">
                    <span className="title">Division</span>
                    <span className="content">{featuredResult.division}</span>
                </section>
                ) : null}
                </section>
                <section>
                {featuredResult.contact ? (
                <section className="facts">
                    <span className="title">Contact</span>
                    <span className="content">{featuredResult.contact}</span>
                </section>
                ) : null}
                </section>
                <section>
                {featuredResult.creditline ? (
                <section className="facts">
                    <span className="title">Creditline</span>
                    <span className="content">{featuredResult.creditline}</span>
                </section>
                ) : null}
                </section>
                <section>
                {featuredResult.culture ? (
                <section className="facts">
                    <span className="title">Culture</span>
                    <span className="content">
                        <Searchable searchTerm="culture" searchValue={featuredResult.culture} setIsLoading={setIsLoading} setSearchResults={setSearchResults}/>
                    </span>
                </section>
                ) : null}
                </section>
                <section>
                {featuredResult.technique ? (
                <section className="facts">
                    <span className="title">Technique</span>
                    <span className="content">
                        <Searchable searchTerm="technique" searchValue={featuredResult.technique} setIsLoading={setIsLoading} setSearchResults={setSearchResults}/>
                    </span>
                </section>
                ) : null}
                </section>
                <section>
                {featuredResult.medium ? (
                <section className="facts">
                    <span className="title">Medium</span>
                    <span className="content">
                        <Searchable searchTerm="medium" searchValue={featuredResult.medium} setIsLoading={setIsLoading} setSearchResults={setSearchResults}/>
                    </span>
                </section>
                ) : null}
                </section>
              <section>
                {featuredResult.people ?
                <section className="facts">
                    <span className="title">Person</span>
                    <span className="content">
                    {featuredResult.people.map((person) => {
                        return <Searchable searchTerm="person" searchValue={person.displayname} setIsLoading={setIsLoading} setSearchResults={setSearchResults}/>
                    })}
                    </span>
                </section>
                : null }
              </section>

                <section className="photos">
                    {featuredResult.images.map((primaryimageurl, index) => {
                       return  <span key={`${primaryimageurl} ${index}`}>
                       {featuredResult.primaryimageurl ? <img src={featuredResult.primaryimageurl} alt={featuredResult.images} />
                       : null}
                       </span>
                    })
                 } </section>
            </div>
        </main>
    
};

export default Feature;