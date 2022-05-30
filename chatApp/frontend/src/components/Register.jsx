import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import { userRegister } from '../store/actions/authAction';
function Register() {

    const dispatch = useDispatch();
    const [state, setState]= useState({
        userName:'',
        email:'',
        password:'',
        confirmPassword:'',
        image:''
    });
    const inputHandle= (e)=> {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const fileHandle = e => {
        if(e.target.files.length !==0){
            setState({
                ...state,
                [e.target.name]: e.target.files[0]
            })
        }
        const reader = new FileReader();
            reader.onload = () => {
            setLoadImage(reader.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    const [loadImage, setLoadImage]= useState('');
    const register = e => {
        const {userName, email, password, image, confirmPassword} = state;
        e.preventDefault();
        const formData= new FormData();
        
        formData.append("userName", userName);
        formData.append("confirmPassword", confirmPassword)
        formData.append("password", password);
        formData.append("email", email);
        formData.append("image", image);
        dispatch(userRegister(formData));
    }
    

  return (
    <div className="register">
        <div className="card">
          <div className="card-header">
              <h3>Register</h3>
          </div>
          <div className="card-body">
              <form onSubmit={register}>
                <div className="form-group">
                  <label htmlFor="username">
                      User Name
                  </label>
                  <input type="text" onChange={inputHandle} className="form-control" placeholder="user name" id="username" value={state.userName} name="userName" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={inputHandle} className="form-control" placeholder="email" id="email" value={state.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={inputHandle} className="form-control" placeholder="password" id="password" value={state.password}/>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input type="password" name="confirmPassword" onChange={inputHandle} className="form-control"  placeholder="confirm password" id="confirmPassword" value={state.confirmPassword}/>
                </div>
                <div className="form-group">
                    <div className="file-image">
                      <div className="image">
                         {loadImage ? <img src={loadImage} /> : ''}
                      </div>
                    <div className="file">
                        <label htmlFor="image">Select Image</label>
                        <input type="file" name="image" onChange={fileHandle} className="form-control" id="image"/>
                    </div>
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="register" className="btn" />
                </div>
                <div className="form-group">
                    <span><Link to="/messenger/login">Login Your Account</Link></span>
                </div>
              </form>
          </div>
        </div>
    </div>
  )
}

export default Register