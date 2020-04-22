import React, { useEffect, useState } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import CardBody from "../../components/cardBody/cardBody";
import Card from "../../components/Card/card";
import DeleteBtn from "../../components/DeleteBtn/deleteBtn"
import ViewBtn from "../../components/viewBtn/viewBtn"

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
    // Filter to return true - if the current book id doesn't include the id that we're deleting, we're going to keep it)
    setBooks(books.filter((book) => {
        return book._id != id;
    }))
  }

    return (
      <Container fluid>
        <Row>
          <div className="hero">
            <Jumbotron>
              <h1>React Google Books Search</h1>
              <h5>Searched & Saved Books of Interest</h5>
            </Jumbotron>
          </div>
          <Col size="md-12">
            <Card>
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