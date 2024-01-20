import Image from "next/image";
import { type Badge } from "~/app/_components/badge";
import { badgeInfo } from "~/app/_components/ui/modals/modal-content-badge-info/gym-metadata";

type ModalContentBadgeInfoProps = Badge;

export function ModalContentBadgeInfo(props: ModalContentBadgeInfoProps) {
  const info = badgeInfo[props.version][props.number];
  const gymLeaderSize = 80;
  const gymSizeScale = 40;
  const gymSizeW = 240 + gymSizeScale;
  const gymSizeH = 160 + gymSizeScale;

  if (!info?.leaderName) {
    return null;
  }

  return (
    <div className="grid justify-items-center gap-y-3">
      <Image
        className="h-20 object-contain"
        alt={`Gym leader ${info?.leaderName} from pokemon ${props.version}`}
        src={info?.iconPathLeader ?? ""}
        width={gymLeaderSize}
        height={gymLeaderSize}
      />

      <ul className="[&_span]:inline-block [&_span]:w-28">
        <li>
          <span>
            <b>Gym Leader</b>:
          </span>{" "}
          {info?.leaderName}
        </li>
        <li>
          <span>
            <b>Location</b>:
          </span>{" "}
          {info?.location}
        </li>
        <li>
          <span>
            <b>Location</b>:
          </span>{" "}
          {info?.specialty}
        </li>
        <li>
          <span>
            <b>Reward</b>:
          </span>{" "}
          {info?.reward}
        </li>
        <li>
          <span>
            <b>Unlocks</b>:
          </span>{" "}
          {info?.unlocks}
        </li>
        <li>
          <span>
            <b>Level</b>:
          </span>{" "}
          {info?.level}
        </li>
      </ul>

      <Image
        alt={`Gym picture from gym #${props.number} on pokemon ${props.version}`}
        src={info?.iconPathGym ?? ""}
        width={gymSizeW}
        height={gymSizeH}
      />
    </div>
  );
}
