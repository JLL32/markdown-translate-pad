import React, { Component } from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Axios from 'axios';
import ReactMarkdown from 'react-markdown';

import Layout from '../components/layout'

class IndexPage extends Component {
  constructor(props) {
    super(props);
  }
  
  state = {
    files: []
  }

  async componentDidMount() {

    const results = this.props.data.allFile.edges.map(async (file) => {
      const res = await Axios.get(file.node.publicURL)
      return {
        ...file.node,
        text: res.data
      };
    });
    
    Promise.all(results)
      .then(result => {
        this.setState({
          files: result
        })
      })
  }

  render() {
    return (
      <Layout>
        <div dir="rtl" className="pi">
          {this.state.files.map(x => (
            <div>
              <h1>{x.name}</h1>
              <ReactMarkdown key={x.id} escapeHtml={false}>{x.text}</ReactMarkdown>
            </div>
          ))}
        </div>
      </Layout>
    )
  }
}

export default IndexPage

export const query = graphql`
{
  allFile {
    edges {
      node {
        id
        name
        extension
        relativeDirectory
        publicURL
      }
    }
  }
}
`

