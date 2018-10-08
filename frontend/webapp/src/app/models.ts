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
  "aliases": [];
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

export class Device {
    "data" : [];
    "total_count" : number;
    "limit" : number;
    "after" : string;
    "has_more" : Boolean;
    "object" : string;
    "order" : string;
  }