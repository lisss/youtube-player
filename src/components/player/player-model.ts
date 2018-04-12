import { BehaviorSubject } from 'rxjs'
import { Video } from '../search'

export class PlayerModel {
  currentVideo = new BehaviorSubject<Video>(null)
}
