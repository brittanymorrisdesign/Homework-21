import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List/";
import Jumbotron from "../../components/Jumbotron/";
import CardBody from "../../components/cardBody/cardBody";
import Card from "../../components/Card/card";
import DeleteBtn from "../../components/DeleteBtn/deleteBtn";
import ViewBtn from "../../components/viewBtn/viewBtn";
import API from "../../utils/API";

function Search() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])

  // Load all books from database
  useEffect(() => {
    API.getBooks()
    .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  }, [])

  // Deletes a book from the database with a given id, then reloads books from the db
  function handleDeleteSubmit(id) {
    API.deleteBook(id)
  
    // Filter
    setBooks(books.filter((book) => {
        return book._id != id;
    }))
  }

    return (
      <Container fluid>
        <Row>
          <div className="hero">
            <Jumbotron>
              <h1>Google Book Search</h1>
              <h5>Search & Save Books</h5>
            </Jumbotron>
          </div>
          <Col size="md-12">
            <Card>
              <h4 className="text-center">Saved Books</h4>
              {books.length >0? (
              <List> 
                {books.map(book => (
                  <ListItem key={book.id}>
                      <Card>
                      <DeleteBtn
                          handleDeleteSubmit={handleDeleteSubmit}
                          id={book._id}
                        />
                        <ViewBtn
                          link={book.link}
                        />
                        <CardBody
                          key={book.id}
                          title={book.title}
                          authors={book.authors}
                          image={book.image}
                          description={book.description}
                        />
                      </Card>
                  </ListItem>
                ))}
              </List>
            ) : (
              <p className="display-message text-center mt-5">Nothing Saved Yet</p>
            )}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }


export default Search;
