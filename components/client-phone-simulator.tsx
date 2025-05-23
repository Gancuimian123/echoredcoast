"use client"

import PhoneSimulator from "./phone-simulator"

export default function ClientPhoneSimulator({ onSecretDoorOpen }) {
  return <PhoneSimulator onSecretDoorOpen={onSecretDoorOpen} />
}
