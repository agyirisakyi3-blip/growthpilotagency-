const HUBSPOT_API = "https://api.hubapi.com/crm/v3";

function headers() {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) return null;
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function createHubSpotContact(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  message?: string;
  source?: string;
}) {
  const hdrs = headers();
  if (!hdrs) return;

  const properties: Record<string, string> = {
    firstname: data.name.split(" ")[0],
    lastname: data.name.split(" ").slice(1).join(" ") || ".",
    email: data.email,
    hs_lead_status: "NEW",
  };
  if (data.phone) properties.phone = data.phone;
  if (data.company) properties.company = data.company;
  if (data.website) properties.website = data.website;
  if (data.message) properties.hs_analytics_source_data_2 = data.message;
  if (data.source) properties.hs_analytics_source = data.source;

  const res = await fetch(`${HUBSPOT_API}/objects/contacts`, {
    method: "POST",
    headers: hdrs,
    body: JSON.stringify({ properties }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("HubSpot contact creation failed:", res.status, body);
    return null;
  }

  return res.json() as Promise<{ id: string }>;
}

export async function createHubSpotDeal(contactId: string, data: {
  name: string;
  company?: string;
  message?: string;
  source?: string;
}) {
  const hdrs = headers();
  if (!hdrs) return;

  const properties: Record<string, string> = {
    dealname: `${data.name}${data.company ? ` - ${data.company}` : ""}`,
    dealstage: "appointmentscheduled",
    pipeline: "default",
    hs_lead_status: "NEW",
  };
  if (data.message) properties.description = data.message;
  if (data.source) properties.hs_analytics_source = data.source;

  const res = await fetch(`${HUBSPOT_API}/objects/deals`, {
    method: "POST",
    headers: hdrs,
    body: JSON.stringify({
      properties,
      associations: [
        {
          to: { id: contactId },
          types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 5 }],
        },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("HubSpot deal creation failed:", res.status, body);
  }
}
