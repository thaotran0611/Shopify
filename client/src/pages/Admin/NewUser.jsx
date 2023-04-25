import { useState } from 'react';
import '../../styles/NewUser.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Avatar } from '@mui/material';
export default function NewUser() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthDay] = useState('');
  const [role, setRole] = useState('admin');
  const [avatar, setAvatar] = useState('');

  const handleSubmit = () => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/users/signup',
      data: {
        username: username,
        password: password,
        name: name,
        phone: phone,
        birthday: birthday,
        avatar: avatar,
        role: role,
      },
    })
      .then((res) => {
        navigate('../dashboard/users');
      })
      .catch((res) => {
        // setOpenError(true);
        console.log(res);
      });
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Admin</h1>
      <Avatar
        sx={{ width: 125, height: 125 }}
        src={avatar}
        alt=""
        className="topAvatar"
      />

      <form className="newUserForm">
        <div className="newUserItem">
          <label>Phone</label>
          <input
            value={phone}
            type="text"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Name</label>
          <input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>User Name</label>
          <input
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Birthday</label>
          <input
            value={birthday}
            type="Date"
            onChange={(e) => setBirthDay(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Role</label>
          <div className="newUserGender">
            <input
              defaultChecked
              type="radio"
              name="role"
              id="admin"
              value="admin"
            />
            <label for="admin">Admin</label>
            <input
              type="radio"
              name="role"
              id="customer"
              value="customer"
              disabled
            />
            <label for="customer">Customer</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Avatar</label>
          <input
            value={avatar}
            type="url"
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit} className="newUserButton">
          Create
        </button>
      </form>
    </div>
  );
}
