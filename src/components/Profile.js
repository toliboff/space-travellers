import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
} from 'react-bootstrap';
import { cancelReservation } from '../redux/rockets/rockets';
import { missions } from '../redux/missions/missions';

const Profile = () => {
  const allMissions = useSelector(missions);
  const reservedMissions = allMissions.filter((mission) => mission.reserved).map(
    (mission) => (
      <ListGroupItem className="pb-4" key={mission.mission_id}>{mission.mission_name}</ListGroupItem>
    ),
  );
  const rocketState = useSelector((state) => state.rocketsReducer);
  const dispatch = useDispatch();
  const reservedRockets = rocketState.filter((rocket) => rocket.reserved).length === 0
    ? <ListGroup.Item>No rockets reserved </ListGroup.Item>
    : rocketState.filter((rocket) => rocket.reserved).map((rocket) => (
      <ListGroup.Item key={rocket.id} className="list-group-item d-flex justify-content-between">
        {rocket.rocket_name}
        <div>
          <Button variant="outline-primary" href={rocket.wikipedia} size="sm" className="me-1">Read More</Button>
          <Button variant="outline-danger" size="sm" onClick={() => dispatch(cancelReservation(rocket.id))}>Cancel Reservation</Button>
        </div>
      </ListGroup.Item>
    ));

  return (
    <Container fluid className="border-top w-100 pt-2">
      <Row>
        <Col xs={12} md={6}>
          <h2>My Missions</h2>
          <Card>
            <ListGroup>
              {reservedMissions}
            </ListGroup>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <h2>My Rockets</h2>
          <ListGroup>
            {reservedRockets}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
