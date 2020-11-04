import React, { useState } from "react";
import AuthModel from '../../AuthModel';
import UserModel from '../../UserModel';

import { useSetRecoilState } from "recoil";
import { userState } from '../../recoil/atoms';

import { Form, Button, Card, Container } from 'react-bootstrap';


function Register(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [cover, setCover] = useState("");
    const setUser = useSetRecoilState(userState)

    function handleSubmit(event) {
        event.preventDefault();
        AuthModel.register({username, email, password, avatar, cover}).then((response) => {
          return console.log(response);          
        }).then((user) => {
            AuthModel.login({username, password}).then((response) => {
                console.log(response);
                localStorage.setItem('access_token', response.access);
                localStorage.setItem('refresh_token', response.refresh);
              
                UserModel.show().then((response) => {
                    console.log(response)
                    setUser(response.username);
                    props.history.push(`/profile/${response.id}/`);
                })
            })
        })
      }


    return (
        <Container>
        <Card className="mx-auto mt-5 text-center" style={{ width: '30rem' }}>
        <Card.Body className="mx-auto mt-4" style={{ width: '25rem' }}>
        <Card.Title><h3>Register for an Account!</h3></Card.Title>
                        
        <Form className="mt-5 text-left" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicText">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username"
            name="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Email" 
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" 
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicText">
            <Form.Label>Avatar</Form.Label>
            <Form.Control type="text" placeholder="Avatar"
            name="avatar" 
            value={avatar} 
            onChange={(e) => setAvatar(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicText">
            <Form.Label>Cover Image</Form.Label>
            <Form.Control type="text" placeholder="Cover Image"
            name="cover" 
            value={cover} 
            onChange={(e) => setCover(e.target.value)}/>
        </Form.Group>

        <Button className="btn-block" variant="primary" type="submit">
            Submit
        </Button>
        </Form>
        </Card.Body>
        </Card>
        </Container>
    );
}
 
export default Register;