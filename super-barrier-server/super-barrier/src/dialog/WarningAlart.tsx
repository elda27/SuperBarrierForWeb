import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

export interface WarningAlartProps {
  open?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
}

export const WarningAlart: React.FC<WarningAlartProps> = ({
  open = false,
  onAccept,
  onReject,
}) => {
  const theme = useTheme();
  const color =
    (
      theme.components?.MuiAlert?.styleOverrides?.standardWarning as {
        backgroundColor: string;
      }
    )?.backgroundColor ?? "#FFF4E5";

  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          backgroundColor: color,
          // boxShadow: "none",
        },
      }}
    >
      <DialogTitle>超結界 for Web - Super Barrier for Web</DialogTitle>
      <Alert severity="warning">
        <AlertTitle>警告 - Warning</AlertTitle>
        <Stack dir="vertical" spacing={1}>
          <Typography>
            このアプリケーションはジョークアプリです。
            また、セキュリティ上の問題があるため、カード番号・パスワードなどを入力しないでください。
          </Typography>
          <Typography>
            意図せずこのページが表示されている場合は"拒否する/Reject"ボタンをクリックした上で、
            ブラウザやOSのプロキシ設定を見直してください。
          </Typography>
          <Typography>
            本サービスの利用にあたって以下のEULA/利用規約を必ずご一読の上でご利用ください
            このサービスは外部のWebページの情報を改ざんする性質を有する点に十分に留意ください。
            また、本サービスについての一切の瑕疵担保責任及び保証責任を負わないものとします。
            さらに、本サービスについて、誤り、動作不良、エラー若しくは他の不具合が生じないこと、
            第三者の権利を侵害しないこと、商品性、若しくは第三者の特定の目的への適合性、
            又は本契約に明示的定めのない他の事項について、何らの保証もしないこととします。
            また本サービスを使用した結果又は使用できなかったことによる結果について一切責任を負わないものとする。
          </Typography>
          <Typography>
            This is a joke application. This service is unavailable to countries
            other than Japan. Please click "Reject" button or close tab and
            confirm proxy settings on your browser or your system.
          </Typography>
          <Typography>
            Notice: Please do not input any card numbers or passwords for
            security issue.
          </Typography>
        </Stack>
      </Alert>
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          onClick={onReject}
          tabIndex={1}
        >
          拒否する/Reject
        </Button>
        <Button variant="outlined" onClick={onAccept} tabIndex={2}>
          同意する/Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WarningAlart;
