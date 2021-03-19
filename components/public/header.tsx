import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  signIn,
  signOut,
  useSession,
  providers,
  SessionProvider,
} from "next-auth/client";
import axios from "axios";

import { Button, Modal, Avatar, Dropdown, Menu } from "antd";
import {
  LoginOutlined,
  GoogleOutlined,
  AppleOutlined,
  FacebookOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Session } from "inspector";

export default function Header({ providers = {} }: { providers: any }) {
  const router = useRouter();

  return (
    <div className="header-content">
      <div className="title">Header</div>
      <div className="actions">
        <Button
          type="primary"
          icon={<LoginOutlined />}
          size="large"
          onClick={() => {
            router.push(`/`);
          }}
        >
          Go to app
        </Button>
      </div>
    </div>
  );
}
