export const getAllServices = async () => {
  const response = await fetch('/service')
    .then((response) => response.json())
    .then((serviceData) => {
      // all of the service information is in 'status'
      return serviceData.map((service) => JSON.parse(service.status));
    })
    .then((data) => {
      // sort so that the latest added service is first
      return data.sort(
        (serviceA, serviceB) =>
          serviceB.addTime?.epochSecond - serviceA.addTime?.epochSecond
      );
    });
  return response;
};

export const createService = async (serviceData) => {
  const response = await fetch('/service', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(serviceData),
  });
  return response;
};

export const deleteService = async (serviceData) => {
  const response = await fetch('/service', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(serviceData),
  });
  return response;
};
