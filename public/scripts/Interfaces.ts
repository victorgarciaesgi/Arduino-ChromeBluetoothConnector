
// Interface d'alerte

export interface AlertObject{
  count: number,
  list: Alert[],
  add(type: AlertType, message: string): void,
  delete(alert: Alert): void
}

export interface Alert{
  id: number,
  type: AlertType,
  message: string
}

type AlertType = "success" | "error" | "warning" | "alert";

export interface rootAlert extends angular.IRootScopeService{
  Alerts: AlertObject
}