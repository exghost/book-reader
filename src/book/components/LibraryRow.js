import React from 'react';
import PropTypes from 'prop-types';

const LibraryRow = ({ bookData }) => {
    return (
        <tr className="library-row">
            <td>{ bookData.title }</td>
            <td>{ bookData.isbn }</td>
            <td>{ bookData.edition }</td>
            <td>{ bookData.publishYear }</td>
            <td>
                { 
                    bookData.authors.reduce((acc, { name }) => {
                        if(acc && acc !== '-') return `${acc}, ${name}`;
                        return name;
                    }, '-') 
                }
            </td>
            <td>
                {
                    bookData.genres.reduce((acc, { label }) => {
                        if(acc && acc !== '-') return `${acc}, ${label}`;
                        return label;
                    }, '-')
                }
            </td>
            <td>
                {
                    bookData.tags.reduce((acc, { label }) => {
                        if(acc && acc !== '-') return `${acc}, ${label}`;
                        return label;
                    }, '-')
                }
            </td>
            <td>
                <button className="btn btn-primary">Read</button>
            </td>
            <td>
                <button className="btn btn-secondary">Edit</button>
            </td>
            <td>
                <button className="btn btn-secondary">Download</button>
            </td>
            <td>
                <button className="btn btn-danger">Delete</button>
            </td>
        </tr>
    )
}

LibraryRow.propTypes = {
    bookData: PropTypes.object.isRequired
}

export default LibraryRow;