export class UserInfo {
  "parent_id": string;
  "display_name": string;
  "company": string;
  "country": string;
  "address_line1": string;
  "address_line2": string;
  "city": string;
  "state": string;
  "postal_code": string;
  "contact": string;
  "email":string;
  "phone_number": string;
  "aliases": string[];
  "tier": number;
  "status": string;
  "is_provisioning_allowed": boolean;
  "upgraded_at": string;
  "limits": string;
  "policies": string;
  "template_id": string;
  "reason": string;
  "reference_note": string;
  "end_market": string;
  "idle_timeout": string;
  "sub_accounts": string;
  "password_policy": string;
  "custom_fields": string;
  "mfa_status": string;
  "notification_emails": string;
  "sales_contact": string;
  "expiration_warning_threshold": string;
  "contract_number": string;
  "customer_number": string;
  "object":"account";
  "id": string;
  "etag": string;
  "created_at": string;
  "updated_at": string
}

export class Devices {
    "data" : Device[];
    "total_count" : number;
    "limit" : number;
    "after" : string;
    "has_more" : Boolean;
    "object" : string;
    "order" : string;
  }

export class Device {
    "account_id": string;
    "auto_update": boolean;
    "bootstrap_expiration_date": string;
    "bootstrapped_timestamp": string;
    "ca_id": string;
    "connector_expiration_date": string;
    "created_at": string;
    "custom_attributes": string; // this should be an object
    "deployed_state": string;
    "deployment": string;
    "description": string;
    "device_class": string;
    "device_execution_mode": number;
    "device_key": string;
    "endpoint_name": string;
    "endpoint_type": string;
    "enrolment_list_timestamp": string;
    "etag": string;
    "firmware_checksum": string;
    "host_gateway": string;
    "id": string;
    "manifest": string;
    "manifest_timestamp": string;
    "mechanism": string;
    "mechanism_url": string;
    "name": string;
    "object": string;
    "serial_number": string;
    "state": string;
    "updated_at": string;
    "vendor_id": string}