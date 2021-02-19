import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  signIn,
  signOut,
  useSession,
  providers,
  SessionProvider,
} from "next-auth/client";

import { Button, Modal, Avatar, Dropdown, Menu } from "antd";
import {
  LoginOutlined,
  GoogleOutlined,
  AppleOutlined,
  FacebookOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Session } from "inspector";

import useActions from "../actions/useActions";

export default function Header({ providers = {} }: { providers: any }) {
  const [showLogin, setShowLogin] = useState(false);
  const [session, loading] = useSession();
  const router = useRouter();

  const { actionSignIn } = useActions();

  useEffect(() => {
    console.log("router.pathname", router.pathname);
    if (
      !loading &&
      !session &&
      /\?callbackUrl/.test(window.location.toString())
    )
      setShowLogin(true);

    // redirect to home after signin
    if (session && router.pathname === "/") {
      actionSignIn(session.user, session.accessToken);
      router.push("/home");
    }

    // redirect to index if not signed in
    if (!session && router.pathname !== "/") router.push("/");
  }, [loading]);

  return (
    <div className="header-content">
      <div className="title">Header</div>
      <div className="actions">
        {loading && <>Loading...</>}
        {!loading && !session && (
          <>
            <Button
              type="primary"
              icon={<LoginOutlined />}
              size="large"
              onClick={() => {
                signIn();
              }}
            >
              Login
            </Button>
          </>
        )}
        {!loading && session && (
          <>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <a
                      onClick={() => {
                        signOut();
                      }}
                    >
                      Logout
                    </a>
                  </Menu.Item>
                </Menu>
              }
              placement="bottomRight"
            >
              <Button
                type="text"
                icon={
                  <Avatar
                    shape="square"
                    size="small"
                    icon={<UserOutlined />}
                    src={session.user.image}
                  />
                }
                size="large"
              >
                &nbsp; {session.user.name}
              </Button>
            </Dropdown>
          </>
        )}
      </div>

      <Modal
        title="Login"
        visible={showLogin}
        onOk={() => {
          setShowLogin(false);
        }}
        onCancel={() => {
          setShowLogin(false);
        }}
        footer={null}
      >
        {providers
          ? Object.values(providers).map((providerTmp: any) => {
              const provider: SessionProvider = providerTmp;

              return (
                <Button
                  type="default"
                  block
                  icon={<GoogleOutlined />}
                  className="login-button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign in with {provider.name}
                </Button>
              );
            })
          : null}
      </Modal>
    </div>
  );
}
