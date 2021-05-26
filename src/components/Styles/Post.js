import styled from "styled-components";

const Post = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  background-color: #171717;
  color: #707070;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-top: 30px;

  div.left {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-bottom: 20px;
    }
    svg {
      color: #fff;
      width: 20px;
      height: 18px;
    }
    p {
      font-family: Lato;
      font-weight: normal;
      font-size: 11px;
      line-height: 13px;
      color: #fff;
    }
    p.likes {
      margin-top: 5px;
      font-size: 11px;
      line-height: 13px;
      color: #fff;
    }
  }

  div.right {
    width: calc(100% - 70px);
    margin-left: 15px;
    p {
      margin-bottom: 8px;
      font-family: Lato;
    }
    p.username {
      font-size: 19px;
      line-height: 23px;
      color: #fff;
    }
    p.user-text {
      font-size: 17px;
      line-height: 20px;
    }
    a.link {
      width: 100%;
      border: 1px solid #4d4d4d;
      border-radius: 11px;
      display: flex;
      justify-content: space-between;
      position: relative;

      .texts {
        margin: 15px;
        max-width: 310px;
        p.link-title {
          font-size: 16px;
          line-height: 19px;
          color: #cecece;
        }
        p.link-description {
          font-size: 11px;
          line-height: 13px;
          color: #9b9595;
        }
        p.link-url {
          font-size: 11px;
          line-height: 13px;
          color: #cecece;
          word-break: break-all;
        }
      }
      .image {
        background-image: url("${(props) => props.image}");
        background-size: cover;
        background-position: center;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 150px;
        border-radius: 0px 11px 11px 0px;
      }
    }
  }

  @media (max-width: 740px) {
    margin-top: 15px;
    padding: 10px 15px;
    border-radius: 0px;

    div.left {
      img {
        height: 40px;
        width: 40px;
        margin-bottom: 15px;
      }
      p.likes {
        font-size: 9px;
        line-height: 11px;
      }
    }
    div.right {
      div.link {
        img {
          width: 95px;
          height: 115px;
        }
      }
    }
  }
`;

export default Post;
