/**
 * @file AppHOC.tsx
 * AppHOC represents higher order components mostly used to enforce props interface.
 * 
 * HOC stands for (Higher Order Component) @see https://www.google.com/search?q=react+higher+order+components&oq=react+high
 *
 * Created by T2 on 08/22/2017
 *
 * T2 PWA Starter
 *
 * Copyright © 2009-2017 United States Government as represented by
 * the Chief Information Officer of the National Center for Telehealth
 * and Technology. All Rights Reserved.
 *
 * Copyright © 2009-2017 Contributors. All Rights Reserved.
 *
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE,
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY").
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES,
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 *
 * Government Agency: The National Center for Telehealth and Technology
 * User Registration Requested. Please send email
 * with your contact information to: robert.a.kayl.civ@mail.mil
 * Government Agency Point of Contact for
 * Original Software: robert.a.kayl.civ@mail.mil
 */
import * as React from 'react';
import  Page, {Props as PageProps} from './Page';
import BackButton from './BackButton';
interface HOCPageProps extends PageProps{
  basePath: string;
  [propName: string]: any;
}


/**
 * This function simply addes properties to a component
 * 
 * @param  {JSX.Element} WrappedComponent - the target component
 * @param  {Object} props - an object containing the props you wish to add to WrappedComponent
 * @return {JSX.Element} - An new Element with properties bound to it.
 */
const withPropsComponent = (WrappedComponent,props) => {
  const componentProps = {...props, tab: undefined, tabIndex: undefined};
  return <WrappedComponent {...componentProps} />;
}

/**
 * Takes any React component as its first argument and wraps said component
 * in a Page component.
 *
 * The Page component handles a lot of common "Pagey" features like seting the page title 
 * and back icons in the AppBar and other ancestor components. 
 *
 * @param WrappedComponent - the JSX.Element you wish to wrap with Page.
 * @param props the minimal set of properties expected by the Page component
 */

export const routePageWithProps = (WrappedComponent,props:HOCPageProps) => {
    return (routeProps) => {
      const tab = typeof props.tab !== 'undefined' ? props.tab : props.tabIndex;
      const combinedProps = {...props,tab: tab};
      return <Page {...combinedProps}>{withPropsComponent(WrappedComponent,{...props,...routeProps})}</Page>;
    }
}

/**
 * Provides a callback function which is expected by the "render" property of the Route component(react-router v4)
 * It combines properties defined by the user with the standard routing properties provided by the
 * route component
 *
 * @see https://reacttraining.com/react-router/core/api/Route/render-func
 * @see https://reacttraining.com/react-router/core/api/Route
 * 
 * 
 * @param  {JSX.Element} WrappedComponent - the JSX.Element you wish Route to render
 * @param  {Object} props - any additional properties you wish to add to WrappedComponent
 * @return {Function} the callback function that altimately renders WrappedComponent
 */
export const routeComponentWithProps = (WrappedComponent,props) => {
    return (routeProps) => {
      return withPropsComponent(WrappedComponent,{...props,...routeProps});
    }
}

/**
 * @deprecated since version 1.0.0
 */
export const menuItem = (WrappedComponent,basePath:string = '/') => {

      return withPropsComponent(WrappedComponent,{basePath});
}

/**
 * Just a convenience function to provide a standard back icon.
 * Mainly for use in the AppBar "leftIcon" property
 * 
 * @param  {string} path - the path to the back page
 * @return {JSX.Element} the back ui component
 */
export const backIcon = (path:string = '/') => {

      return <BackButton path={path} />;
}
/**
 * @deprecated since version 1.0.0
 * 
 * Just a convenience function to combine the most common back navigation options in 
 * one function.
 *
 * @param {string} path - the path/route to the back destination
 */
export const leftIconProps = (path:string): {leftIcon: JSX.Element, titlePath: string} => {

      return {
                leftIcon: backIcon(path),
                titlePath: path
      };
}
